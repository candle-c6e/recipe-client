import { FunctionComponent } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  totalPages: number;
  handleChangePage: ({ selected }: { selected: number }) => void;
}

const Paginate: FunctionComponent<Props> = ({
  totalPages,
  handleChangePage,
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
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Paginate;
