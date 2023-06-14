function Quote({quote}) {

    const {quoteAuthor, quoteText, quoteGenre} = quote

    return (
        <div className="quote">
            <p className="type">{quoteGenre}</p>

            <p className="content">{`"${quoteText}”`}</p>

            <p className="author"> ~ <i>{quoteAuthor}</i> ~</p>
        </div>
    )
}

export default Quote;