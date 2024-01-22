import React from "react";


export default class MovieCard extends React.Component {


    render() {
        const {title, date, genre, description, img} = this.props;

        return (
            <article>
                <figure className="">
                    <img
                        src={img}
                        className=""
                        width={313}
                        height={320}
                        alt={title}
                    />

                </figure>
                <div>
                    <h2>{title}</h2>
                    <div>{date}</div>
                    <div>{genre}</div>
                    <div>{description}</div>
                </div>

            </article>
        )
    }


}