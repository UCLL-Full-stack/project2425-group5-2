import jwt from 'jsonwebtoken';

const generateJWTToken = (email: string, role: string): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRATION_TIME}h`, issuer: 'courses_app' };

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign({ email, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJWTToken };