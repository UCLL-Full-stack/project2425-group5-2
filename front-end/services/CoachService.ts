const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllCoaches = async () => {
    return await fetch(apiUrl + '/coaches', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const CoachService = { getAllCoaches };

export default CoachService;
