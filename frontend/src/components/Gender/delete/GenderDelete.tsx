import { useGenderLogin } from "../../../hook/gender/useGenderLogin";

const GenderDelete = () => {
    const { clearGender } = useGenderLogin();

    return (
        <button
            onClick={clearGender}
            style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            性別を削除
        </button>
    );
};

export default GenderDelete;