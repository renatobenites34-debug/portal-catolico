import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Início',
      href: getPermalink('/'),
    },
    {
      text: 'Santos & Devoções',
      href: getBlogPermalink(),
    },
    {
      text: 'Notícias da Igreja',
      href: getPermalink('noticias', 'category'),
    },
    {
      text: 'Vitrine Sacra',
      href: getPermalink('/vitrine'),
    },
    {
      text: 'Pedidos de Oração',
      href: getPermalink('/pedidos-oracao'),
    },
  ],
  actions: [{ text: 'Rezar Conosco', href: getPermalink('/pedidos-oracao') }],
};

export const footerData = {
  links: [
    {
      title: 'Devoção',
      links: [
        { text: 'Santos & Devoções', href: getBlogPermalink() },
        { text: 'Notícias da Igreja', href: getPermalink('noticias', 'category') },
        { text: 'Pedidos de Oração', href: getPermalink('/pedidos-oracao') },
      ],
    },
    {
      title: 'Arte Sacra',
      links: [
        { text: 'Vitrine Sacra', href: getPermalink('/vitrine') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Termos', href: getPermalink('/terms') },
    { text: 'Privacidade', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    Oratório & Fé — Devoção e Arte Sacra · Todos os direitos reservados.
  `,
};
