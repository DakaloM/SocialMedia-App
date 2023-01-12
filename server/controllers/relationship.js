import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";


export const getRelationship= (req, res) => {
    
    const q = `SELECT followerUserId FROM relationships WHERE followingUserId = ?` 
    
    db.query(q, [req.query.followingUserId],(err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data.map((relationship) => relationship.followerUserId));
    })
  
    
}
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Invalid Token");

        const q = "INSERT INTO relationships (`followerUserId`, `followingUserId`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.userId,

        ]
        
        db.query(q, [values],(err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Relationship created");
        })
    })
}

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Invalid Token");

        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followingUserId` = ?";

        
        
        db.query(q, [userInfo.id, req.query.userId],(err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Relationship Deleted");
        })
    })
}