const Helpers = () => {

    const validateField = (res, field, errorMessage) => {
        if (!field) {
            res.status(422).json({ message: errorMessage })
            return false
        }
        return true
    }

    return {
        validateField
    }
}

export default Helpers
export { Helpers }