/**
 * Persistência dos pedidos de oração.
 *
 * O site é estático (SSG), então não há servidor para gravar em SQLite/JSON
 * no disco da VPS em tempo de execução. Estratégia adotada:
 *
 * 1. Tenta enviar para um endpoint HTTP (PEDIDOS_ENDPOINT) quando configurado
 *    — ex: uma API (Cloudflare Worker, endpoint Astro com `prerender=false`
 *    + adapter Node) que grave em SQLite/JSON na VPS. Pronto p/ disparo em lote.
 * 2. Sempre mantém cópia local no navegador (localStorage), como fila
 *    estruturada de fallback — nada se perde caso o endpoint esteja fora.
 *
 * Estrutura do pedido (JSON):
 * { id: string(uuid), nome: string, cidade: string, intencao: string, data: string(ISO8601) }
 */

export interface PedidoOracao {
  id: string;
  nome: string;
  cidade: string;
  intencao: string;
  data: string; // ISO 8601
}

const STORAGE_KEY = 'pedidos_oracao';
const ENDPOINT = import.meta.env.PUBLIC_PEDIDOS_ENDPOINT as string | undefined;

export async function savePedido(pedido: PedidoOracao): Promise<void> {
  // 1) fila local (fallback garantido)
  const fila: PedidoOracao[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  fila.push(pedido);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fila));

  // 2) endpoint remoto, quando configurado
  if (ENDPOINT) {
    const resp = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });
    if (!resp.ok) throw new Error(`endpoint respondeu HTTP ${resp.status}`);
  }
}

/** Lista todos os pedidos guardados localmente (útil p/ painel de exportação em lote). */
export function listPedidos(): PedidoOracao[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
