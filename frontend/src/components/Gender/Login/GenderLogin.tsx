import { useGenderLogin } from "../../../hook/gender/useGenderLogin";

const GenderComponent = () => {
    const { setGender } = useGenderLogin();

    const handleSelectGender = (selectedGender: "male" | "female") => {
        setGender(selectedGender);
        window.location.reload();
    };

    return (
        <div>
            <p>性別を選択してください。</p>
            <button onClick={() => handleSelectGender("male")}>男性</button>
            <button onClick={() => handleSelectGender("female")}>女性</button>
        </div>
    );
};

export default GenderComponent;