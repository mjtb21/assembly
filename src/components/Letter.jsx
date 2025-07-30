export default function Letter({letter, handleLetters, isDone}) {
    const doneClass = isDone ? "done" : "";
    return (
        <button
            className={`letter ${letter.status} ${doneClass}`}
            disabled={isDone || letter.status !== ""}
            key={letter.id}
            id={letter.id}
            onClick={e => handleLetters(e, letter)}>
            {letter.name}
        </button>
    )
}