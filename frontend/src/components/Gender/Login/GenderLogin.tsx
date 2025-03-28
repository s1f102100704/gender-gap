import { useGenderLogin } from "../../../hook/gender/useGenderLogin";

const GenderComponent = () => {
    const { setGender } = useGenderLogin();

    const handleSelectGender = (selectedGender: "male" | "female") => {
        setGender(selectedGender); // 性別を設定
        console.log(`性別が設定されました: ${selectedGender}`); // デバッグ用ログ
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