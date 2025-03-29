import React, { useRef,} from 'react';
type ImgUploadFormProps = {
  onFileSelect: (file: File) => void;
};
const ImgUploadForm: React.FC<ImgUploadFormProps> = ({ onFileSelect }) =>{
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file); 
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={handleClick}>画像を選択</button>
    </div>
  );
};

export default ImgUploadForm;