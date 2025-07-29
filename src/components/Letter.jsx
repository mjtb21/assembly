export default function Letter({letter, handleLetters}) {
    return (
        <button
            className={`letter ${letter.status}`}
            key={letter.id}
            id={letter.id}
            onClick={e => handleLetters(e, letter)}>
            {letter.name}
        </button>
    )
}