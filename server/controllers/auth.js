
import { db } from "../connect.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = (req, res) => {

    //check if the user with the same credential already exist in the database
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err.message);
        if(data.length) return res.status(409).json("User already exist!")
        // if the user already exist then redirect to login page

        // if the user does not exist, proceed with the registration
        // create a news user
        // hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        // Add the new user to the database
        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE(?)"
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json("User has been created.")
        });

    })

   

    

    
}   
export const login = (req, res) => {
    // Check the username is found in the database
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("User is not found");
        // User is found, verify the password
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!checkPassword) {
            return res.status(400).json("Username and Password do not match");
        } else {
            const token = jwt.sign({id: data[0].id}, "secretkey");
            const {password, ...others} = data[0];
            res.cookie("accessToken", token, {httpOnly: true}).status(200).json(others);
    
        }

        
    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")
}
