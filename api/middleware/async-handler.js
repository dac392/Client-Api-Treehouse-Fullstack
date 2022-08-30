/**
 * Abstraction of a try/catch block, used for code readability.
 * @param {CallBack} cb - The function used as a callback
 * @returns 
 */
exports.handler = (cb)=>{
    return async (req, res, next)=>{
        try{
            await cb(req, res, next);
        }catch(error){
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'ValidationError') {
                const errors = error.errors.map(err => err.message);
                res.status(400).json({ errors });   
            } else {
                throw error;
            }
            next(error);
        }
    }
}