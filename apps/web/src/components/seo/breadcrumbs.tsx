import { Link } from '@/lib/i18n/navigation';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { JsonLdScript } from './json-ld-script';
import { SITE_URL } from '@/lib/seo/metadata';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    url: `${SITE_URL}/${locale}${item.href}`,
  }));

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd(jsonLdItems)} />
      <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
        <ol className="flex items-center gap-1.5 flex-wrap">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span className="text-ink-700 font-bold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary-500 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
