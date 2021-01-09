import { FunctionComponent } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  totalPages: number;
  handleChangePage: ({ selected }: { selected: number }) => void;
  forcePage?: number;
}

const Paginate: FunctionComponent<Props> = ({
  totalPages,
  handleChangePage,
  forcePage,
}) => {
  return (
    <ReactPaginate
      previousLabel={<AiOutlineArrowLeft />}
      nextLabel={<AiOutlineArrowRight />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handleChangePage}
      forcePage={forcePage}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Paginate;
