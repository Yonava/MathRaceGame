import axios from 'axios';

const sessionUrl = 'api/sessions/';
// const userUrl = 'api/users/';

class DatabaseServices {

    // Get All Sessions
    static async getAllSessions() {
        try {
            const res = await axios.get(sessionUrl);
            return res.data;
        } catch (error) {
            console.warn(error)
        }
    }

    // Find Session With Corrosponding Room ID
    static async findSessionByRoomID(roomid) {
        try {
            const res = await axios.get(`${sessionUrl}${roomid}`)
            return res.data
        } catch (error) {
            console.warn(error)
        }
    }  

    // Post A Session to Sessions Database
    static createNewSession(session) {
        return axios.post(sessionUrl, { session })
    }

    // Close Session
    static deleteSessionByRoomID(roomid) {
        return axios.delete(`${sessionUrl}${roomid}`)
    }
}

export default DatabaseServices;