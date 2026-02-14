const FetchQuranSurah = async (req, res) => {
    const surahnumber = req.params.surahnumber;
    
    try {
        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${surahnumber}/ar.alafasy`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch quran surah from external API"
            });
        }

        const data = await response.json();

        return res.status(200).json({
            message: "Quran surah retrieved successfully.",
            data: data.data
        });

    } catch (error) {
        console.error("Error processing the request:", error);

        return res.status(500).json({
            error: "An error occurred while processing the request."
        });
    }
};

module.exports = {
   FetchQuranSurah,
};
