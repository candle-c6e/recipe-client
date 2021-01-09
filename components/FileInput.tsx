import styled from "styled-components";
import { FaPlus, FaTimes } from "react-icons/fa";
import { ChangeEvent, FunctionComponent, MouseEvent } from "react";

interface Props {
  file: string;
  onDelete: (file: string) => void;
  onChange: (input: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FunctionComponent<Props> = ({ file, onChange, onDelete }) => {
  return (
    <Wrapper>
      {file ? (
        <Image onClick={() => onDelete(file)}>
          <Times>
            <FaTimes color="white" />
          </Times>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/recipe/${file}`}
          />
        </Image>
      ) : (
        <label htmlFor="file">
          <FaPlus size={30} />
          <input
            type="file"
            onChange={onChange}
            id="file"
            style={{ display: "none" }}
          />
        </label>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  width: 200px;
  border: 1px solid var(--light-gray);

  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Times = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
`;

export default FileInput;
