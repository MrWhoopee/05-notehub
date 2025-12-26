import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <p>Loading...</p>
    </div>
  );
}
