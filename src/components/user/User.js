import React from 'react';

const User = (props) => {
    const fimilar = props.fimilar;
    // let greetings;
    // if(fimilar === true){
    //     greetings = <p>Welcome, my friend.</p>;
    // }else{
    //     greetings = <p>Whot the hel are you?</p>
    // }

    // ternary operator
    const greetings = fimilar ? <p>Welcome, my friend.</p>:<p>Whot the hel are you?</p>;
    return (
        <div>
            <div>
                <h2>Gretting</h2>
                {greetings}
            </div>
            <div>
                <h2>Food</h2>
                {fimilar ? <p>I will buy food for you.</p>: <p>Lets eat this this whose whose?</p>}       
            </div>
            <div>
                <h2>Connection</h2>
                {fimilar && <p>Lets join my facebook.</p>}
            </div>
        </div>
    );
};

export default User;