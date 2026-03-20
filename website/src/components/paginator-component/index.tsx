import { Button } from "@/components/ui/button";

export interface Paginator {
  dataCount: number;
  offset?: number;
  limit: number;
  pageCount: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

interface PaginatorComponentProps {
  paginator: Paginator | null | undefined;
  onChangePage: (page: number) => void;
}

export const PaginatorComponent = ({
  paginator,
  onChangePage,
}: PaginatorComponentProps) => {
  if (!paginator || paginator.pageCount <= 1) return null;

  const { page, pageCount, hasPrevPage, hasNextPage, prevPage, nextPage } =
    paginator;

  const startItem =
    paginator.dataCount === 0 ? 0 : (paginator.page - 1) * paginator.limit + 1;

  const endItem = Math.min(
    (paginator.page - 1) * paginator.limit + paginator.limit,
    paginator.dataCount,
  );

  const getPages = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, page - 2);
    let end = Math.min(pageCount, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <div className="text-sm text-muted-foreground">
        Mostrando del <span className="font-medium">{startItem}</span> al{" "}
        <span className="font-medium">{endItem}</span> de{" "}
        <span className="font-medium">{paginator.dataCount}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPrevPage}
          onClick={() => prevPage && onChangePage(prevPage)}
        >
          Anterior
        </Button>

        {pages[0] > 1 && (
          <>
            <Button variant="outline" size="sm" onClick={() => onChangePage(1)}>
              1
            </Button>
            {pages[0] > 2 && <span className="px-1">...</span>}
          </>
        )}

        {pages.map((p) => (
          <Button
            key={p}
            size="sm"
            variant={p === page ? "default" : "outline"}
            onClick={() => onChangePage(p)}
          >
            {p}
          </Button>
        ))}

        {pages[pages.length - 1] < pageCount && (
          <>
            {pages[pages.length - 1] < pageCount - 1 && (
              <span className="px-1">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChangePage(pageCount)}
            >
              {pageCount}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          disabled={!hasNextPage}
          onClick={() => nextPage && onChangePage(nextPage)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
