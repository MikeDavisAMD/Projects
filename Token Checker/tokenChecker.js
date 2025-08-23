require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Format a Date object to "DD-MM-YYYY HH:mm"
 * @param {Date} date
 * @returns {string}
 */

function DATE(date) {
    const d = date.getDate().toString().padStart(2,'0')
    const m = (date.getMonth() + 1).toString().padStart(2,'0')
    const y = date.getFullYear()
    const h = date.getHours().toString().padStart(2,'0')
    const min = date.getMinutes().toString().padStart(2,'0')
    return `${d}-${m}-${y} ${h}:${min}`
 }

/**
 * Checks if a JWT token is valid or expired
 * @param {string} token - The JWT token
 * @param {string} secret - Your JWT secret
 * @returns {object} - { valid: boolean, expired: boolean, decoded: object|null }
 */
function checkToken(token, secret) {
    if (!token) return { valid: false, expired: false, decoded: null };

    try {
        const decoded = jwt.verify(token, secret);
        return { valid: true, expired: false, decoded: {
            ...decoded,
            CreatedAt: decoded.iat ? DATE(new Date(decoded.iat * 1000)) : null,
            Expiry: decoded.exp ? DATE(new Date(decoded.exp * 1000)) : null
        } };
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            // Token is expired, decode it anyway to see payload
            const decoded = jwt.decode(token);
            return { valid: false, expired: true, decoded:{
                ...decoded,
                iatFormatted: decoded?.iat ? DATE(new Date(decoded.iat * 1000)) : null,
                expFormatted: decoded?.exp ? DATE(new Date(decoded.exp * 1000)) : null
            } };
        } else {
            // Invalid token
            return { valid: false, expired: false, decoded: null };
        }
    }
}

// Example usage:
const token = process.env.TOKEN
const result = checkToken(token, process.env.JWT_SECRET);

console.log(result);
/* Output example:
{
  valid: false,
  expired: true,
  decoded: { id: '64f123abc456', iat: 1692622000, exp: 1692625600 }
}
*/
