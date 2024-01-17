import React from "react";

export default class MovieCard extends React.Component {
    render() {
        return (
            <article>
                <figure className="">
                    <img
                        src={image}
                        className=""
                        width={313}
                        height={320}
                        alt="постер фильма"
                    />

                </figure>
                <h2>The way back</h2>
                <div>March 5, 2020</div>
                <div>Action, Drama</div>
                <div>A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...</div>
            </article>
        )
    }


}