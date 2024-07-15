
export const useDate = () => {
    const getCurrentDate = (): string => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month: number | string = currentDate.getMonth() + 1;
        let day: number | string = currentDate.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    const calculateRevisionDate = (releaseDate: Date): string => {
        const revisionDate = new Date(releaseDate);
        revisionDate.setFullYear(revisionDate.getFullYear() + 1);
        const year = revisionDate.getFullYear();
        let month: number | string = revisionDate.getMonth() + 1;
        let day: number | string = revisionDate.getDate();

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    return {
        getCurrentDate,
        calculateRevisionDate,
    };
}
