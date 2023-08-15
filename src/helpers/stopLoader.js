const stopLoader = (router, key) => {
    setTimeout(() => {
        if (!key) router.back();
    }, 5000);
}

export default stopLoader;