import { useGenderLogin } from "../../../hook/gender/useGenderLogin";

const GenderComponent = () => {
    const { setGender } = useGenderLogin();

    const handleSelectGender = (selectedGender: 1 | 2) => {
        setGender(selectedGender);
        window.location.reload();
    };

    return (
        <div>
            <p>性別を選択してください。</p>
            <button onClick={() => handleSelectGender(1)}>男性</button>
            <button onClick={() => handleSelectGender(2)}>女性</button>
        </div>
    );
};

export default GenderComponent;