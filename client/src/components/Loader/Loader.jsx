import style from "./Loader.module.css"; // Вірний імпорт для модульних стилів
export const Loader = () => {
  return (
    <div>
      <div className={style["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};