import fs from 'node:fs';
import path from 'node:path';

const MEDIA_ID = '18088449407439701';
const POLL_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes
const REPLIED_FILE = path.join(new URL('.', import.meta.url).pathname, 'replied-users.json');
const HUB_LINK = 'https://praia.digital/hub/ia-corretores-litoral.html';
const REPLY_TEXT = `Olá! Vi seu comentário no post de Santos. 📈 Aqui está o link para você simular o yield e ver a análise completa de rentabilidade: ${HUB_LINK}`;
const KEYWORD = 'SIMULAR';

function getEnv() {
  const token = process.env.INSTAGRAM_GRAPH_TOKEN;
  const igUserId = process.env.INSTAGRAM_IG_USER_ID;
  if (!token || !igUserId) {
    throw new Error('Missing required env: INSTAGRAM_GRAPH_TOKEN or INSTAGRAM_IG_USER_ID');
  }
  return { token, igUserId };
}

function loadReplied() {
  try {
    const raw = fs.readFileSync(REPLIED_FILE, 'utf8');
    const obj = JSON.parse(raw);
    if (!Array.isArray(obj.replied_user_ids)) return { replied_user_ids: [] };
    return obj;
  } catch {
    return { replied_user_ids: [] };
  }
}

function saveReplied(state) {
  fs.writeFileSync(REPLIED_FILE, JSON.stringify(state, null, 2), 'utf8');
}

async function fetchJson(url, headers) {
  const res = await fetch(url, { headers });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
}

async function fetchComments({ token, igUserId }) {
  const url = `https://graph.facebook.com/v21.0/${MEDIA_ID}/comments?fields=id,text,username,from{id,username}&limit=50&access_token=${encodeURIComponent(token)}`;
  const { status, data } = await fetchJson(url);
  if (status !== 200) {
    console.error(`[${new Date().toISOString()}] fetch comments failed: ${status}`, data);
    return [];
  }
  const items = Array.isArray(data?.data) ? data.data : [];
  return items;
}

async function sendDirect({ token, igUserId }, recipientId, messageText) {
  const url = `https://graph.facebook.com/v21.0/${igUserId}/messages?access_token=${encodeURIComponent(token)}`;
  const body = {
    recipient: { id: recipientId },
    message: { text: messageText }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok || data?.error) {
    console.error(`[${new Date().toISOString()}] send DM failed: ${res.status}`, data);
    return { ok: false, data };
  }
  console.log(`[${new Date().toISOString()}] DM sent to ${recipientId}`);
  return { ok: true, data };
}

async function processComments() {
  const env = getEnv();
  const state = loadReplied();
  const repliedSet = new Set(state.replied_user_ids);

  try {
    const comments = await fetchComments(env);
    const matched = comments.filter((c) => {
      const text = String(c.text || '').toUpperCase();
      const authorId = String((c.from && c.from.id) || '');
      return text.includes(KEYWORD) && authorId && !repliedSet.has(authorId);
    });

    console.log(`[${new Date().toISOString()}] comments=${comments.length} matched=${matched.length}`);

    for (const comment of matched) {
      const authorId = String(comment.from?.id || '');
      const username = String(comment.from?.username || comment.username || 'unknown');
      if (!authorId) continue;
      const result = await sendDirect(env, authorId, REPLY_TEXT);
      if (result.ok) {
        repliedSet.add(authorId);
        state.replied_user_ids = Array.from(repliedSet);
        saveReplied(state);
      }
    }
  } catch (err) {
    console.error(`[${new Date().toISOString()}] polling error:`, err?.message || err);
  }
}

async function main() {
  console.log(`Monitoring media=${MEDIA_ID} for keyword=${KEYWORD}`);
  console.log(`DM text: ${REPLY_TEXT}`);
  console.log(`Replied state file: ${REPLIED_FILE}`);

  await processComments();
  setInterval(() => processComments(), POLL_INTERVAL_MS);
}

main().catch((err) => {
  console.error('Fatal:', err?.message || err);
  process.exit(1);
});
