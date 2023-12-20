import { createRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
import useNotification from "../../hooks/useNotification";

interface UploadCloudinaryProps {
  urlImage: string;
  callbackUrl?: (url: string) => void;
}

const UploadCloudinary = ({ urlImage = "", callbackUrl }: UploadCloudinaryProps) => {
  const { messageSuccess } = useNotification();

  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<any>(urlImage);
  const [loading, setLoading] = useState(false);

  const inputRef = createRef<any>();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    data.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      messageSuccess("Tải lên thành công, cập nhật để lưu ảnh đại diện mới");

      if (callbackUrl) {
        callbackUrl(res.url);
      }
    } catch (error) {
      console.log("🚀 -> uploadImage -> error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickUpload = () => {
    if (!inputRef) return;

    inputRef.current.click();
  };

  return (
    <WrapperUploadCloudinary>
      <div className="container-upload" onClick={handleClickUpload}>
        {preview === null ? (
          <div>Tải ảnh lên</div>
        ) : (
          <img src={preview} alt="preview" className="img-preview" />
        )}

        <input
          id="hidden-input-avt"
          type="file"
          //hidden input
          onChange={handleImageChange}
          accept="image/*"
          ref={inputRef}
        />
      </div>

      <div className="mt-2">
        <Button variant="secondary" onClick={uploadImage} disabled={!image}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Đang tải...
            </>
          ) : (
            <>Tải lên ảnh đại diện</>
          )}
        </Button>
      </div>
    </WrapperUploadCloudinary>
  );
};

export default UploadCloudinary;

const WrapperUploadCloudinary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  #hidden-input-avt {
    visibility: hidden;
    height: 0px;
  }

  .container-upload {
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px;
    border-style: dashed;
    border-color: black;

    border-radius: 8px;
    cursor: pointer;

    &:hover {
      border-color: green;
    }

    .img-preview {
      width: 180px;
      height: 180px;
      object-fit: fill;
      border-radius: 8px;
    }
  }
`;
