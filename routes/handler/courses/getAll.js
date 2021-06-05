const apiAdapter = require('../../apiAdapter');
const {
  URL_SERVICE_COURSE,
  URL_HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courses = await api.get('/api/courses', {
        params : {
            ...req.query,
            status: 'published'
        }
    });

    // object dari axios
    const coursesData = courses.data;
    // get data yang ingin langsung di arahkan dengan check split pop
    const firstPage = coursesData.data.first_page_url.split('?').pop();
    const lastPage = coursesData.data.last_page_url.split('?').pop();

    // kemudian pada data ubah menjadi seperti yang ada di postman
    coursesData.data.first_page_url = `${URL_HOSTNAME}/courses?${firstPage}`;
    coursesData.data.last_page_url = `${URL_HOSTNAME}/courses?${lastPage}`;

    if (coursesData.data.next_page_url) {
        const nextPage = coursesData.data.next_page_url.split('?').pop();
        coursesData.data.next_page_url = `${URL_HOSTNAME}/courses?${nextPage}`;
    }

    if (coursesData.data.prev_page_url) {
        const prevPage = coursesData.data.prev_page_url.split('?').pop();
        coursesData.data.prev_page_url = `${URL_HOSTNAME}/courses?${prevPage}`;
    }

    coursesData.data.path = `${URL_HOSTNAME}/courses`;
    
    coursesData.data.links.forEach(element => {
        console.log(element.url);
        if (element.url) {
            const url = element.url.split('?').pop();
            element.url = `${URL_HOSTNAME}/courses?${url}`;
        }
    });

    return res.json(coursesData);
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}