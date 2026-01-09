import "./styles.css";

function CSSFile() {
  return <h1 className="title">Hello CSS File!</h1>;
}
React.useEffect(() => {
  console.log("Component is mounted!");
}, []);

function FocusInput() {
  const inputRef = React.useRef();

  return (
    <div>
      <input ref={inputRef} placeholder="Type here..." />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}
