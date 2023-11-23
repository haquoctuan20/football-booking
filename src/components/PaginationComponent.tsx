import { useMemo, useState } from "react";
import { Pagination } from "react-bootstrap";
import styled from "styled-components";
import { SHOW_PAGINATION_ITEMS } from "../constants/constants";
import { FaLessThanEqual } from "react-icons/fa";

interface PaginationComponentProps {
  activePage: number;
  total: number;
  perPage: number;
  onClick?: (pageNumber: number) => void;
}

const PaginationComponent = ({
  activePage,
  total,
  perPage,
  onClick,
}: PaginationComponentProps) => {
  const pages = Math.ceil(total / perPage);
  const [active, setActive] = useState(activePage);
  console.log("🚀 - active: ", active);

  const itemsPagination = useMemo(() => {
    const items = [];

    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handleClickItem(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  }, [pages, total, perPage, active]);

  const handleClickItem = (page: number) => {
    setActive(page);
    if (onClick) {
      return onClick(page);
    }
  };

  return (
    <WrapperPaginationComponent
      className={`d-flex justify-content-center ${total <= 0 && `d-none`}`}
    >
      <Pagination>
        {pages < SHOW_PAGINATION_ITEMS ? (
          <>{itemsPagination}</>
        ) : (
          <>
            {active > 0 && active < 4 ? (
              <>
                <Pagination.Item
                  key={1}
                  active={1 === active}
                  onClick={() => handleClickItem(1)}
                >
                  1
                </Pagination.Item>

                <Pagination.Item
                  key={2}
                  active={2 === active}
                  onClick={() => handleClickItem(2)}
                >
                  2
                </Pagination.Item>

                <Pagination.Item
                  key={3}
                  active={3 === active}
                  onClick={() => handleClickItem(3)}
                >
                  3
                </Pagination.Item>
                <Pagination.Ellipsis
                  onClick={() => handleClickItem(4)}
                  key={4}
                  active={4 === active}
                />

                <Pagination.Last
                  onClick={() => handleClickItem(pages)}
                  key={"last-first"}
                />
              </>
            ) : (
              <>
                {active < pages ? (
                  <>
                    <Pagination.First
                      onClick={() => handleClickItem(1)}
                      key={"first-middle"}
                    />

                    <Pagination.Ellipsis
                      onClick={() => handleClickItem(active - 2)}
                      key={active - 2}
                    />

                    <Pagination.Item
                      onClick={() => handleClickItem(active - 1)}
                      active={active - 1 === active}
                    >
                      {active - 1}
                    </Pagination.Item>
                    <Pagination.Item
                      onClick={() => handleClickItem(active)}
                      active={active === active}
                    >
                      {active}
                    </Pagination.Item>
                    <Pagination.Item
                      onClick={() => handleClickItem(active + 1)}
                      active={active + 1 === active}
                    >
                      {active + 1}
                    </Pagination.Item>

                    <Pagination.Ellipsis
                      onClick={() =>
                        handleClickItem(
                          active + 2 > pages ? active + 1 : active + 2
                        )
                      }
                      key={active + 2 > pages ? active + 1 : active + 2}
                    />

                    <Pagination.Last
                      onClick={() => handleClickItem(pages)}
                      key={"last-middle"}
                    />
                  </>
                ) : (
                  <>
                    <Pagination.First
                      onClick={() => handleClickItem(1)}
                      key={"first-end"}
                    />

                    <Pagination.Ellipsis
                      onClick={() => handleClickItem(active - 2)}
                      key={active - 2}
                      active={pages - 2 === active}
                    />
                    <Pagination.Item
                      onClick={() => handleClickItem(pages - 1)}
                      key={pages - 1}
                      active={pages - 1 === active}
                    >
                      {pages - 1}
                    </Pagination.Item>

                    <Pagination.Item key={pages} active={active === pages}>
                      {pages}
                    </Pagination.Item>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Pagination>
    </WrapperPaginationComponent>
  );
};

export default PaginationComponent;

const WrapperPaginationComponent = styled.div`
  .pagination {
    margin-bottom: 0;

    .page-link {
      color: #000;
      background-color: transparent;
      /* border-color: #198754; */
      z-index: auto;

      border-radius: 20px;
      width: 40px;
      height: 40px;
      text-align: center;

      padding: 0px;
      line-height: 38px;

      font-weight: 500;
    }

    .page-item.active .page-link {
      color: #fff;
      background-color: #198754;
      border-color: #198754;
    }

    li.page-item {
      margin: 0px 4px;
    }

    .page-link:focus {
      box-shadow: none;
      border-color: #198754;
    }
  }
`;
