export default function Lang({lang}) {
    return (
        <div
            className={`lang ${lang.id} ` + (!lang.status ? "dead" : "")}
            key={lang.id}>
            {lang.name}
        </div>
    )
}