import React from "react";

const UserCards = (props) => {
  console.log(props.data);
  let imageUrl = props.data.picture.large;
  return (
    <>
    <h1>Random User Generator</h1>
    <div className="user-card">
     <img src={imageUrl} />
      <h3>
        {`
            ${props.data.name.title} 
            ${props.data.name.first}
            ${props.data.name.last}
            `}
      </h3>
      <p>{props.data.phone}</p>
      <p>
        {props.data.location.city}, {props.data.location.state}
      </p>
    </div>
    </>
  );
};

export default UserCards;
