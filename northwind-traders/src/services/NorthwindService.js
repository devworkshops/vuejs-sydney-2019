import axios from 'axios'
import NProgress from 'nprogress'
import router from '../router.js'

const apiClient = axios.create({
    baseURL: `//localhost:3000`,
    timeout: 1000,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(
    config => {
        NProgress.start()
        if (AuthService.token()) {
            config.headers.authorization = 'Bearer ' + AuthService.token()
        }
        return config
    },
    err => {
        NProgress.done()
    }
)
apiClient.interceptors.response.use(
    config => {
        NProgress.done()
        return config
    },
    err => {
        NProgress.done()
        if (err.response.status == 401) router.push('/unauthorized')
        throw err
    }
)

export const SuppliersService = {
    getAll() {
        return apiClient.get('/suppliers')
    },
    get(id) {
        return apiClient.get('/suppliers/' + id)
    },
    update(supplier) {
        return apiClient.put('/suppliers/' + supplier.id, supplier)
    },
    create(supplier) {
        return apiClient.post('/suppliers', supplier)
    }
}

export const CategoriesService = {
    getAll() {
        return apiClient.get('/categories')
    },
    get(id) {
        return apiClient.get('/categories/' + id)
    },
    create(category) {
        return apiClient.post('/categories/', category)
    },
    update(category) {
        return apiClient.put('/categories/' + category.id, category)
    },
    delete(id) {
        return apiClient.delete('/categories/' + id)
    }
}

export const ProductsService = {
    getAll() {
        return apiClient.get('/products')
    },
    get(id) {
        return apiClient.get('/products/' + id)
    },
    create(product) {
        return apiClient.post('/products/', product)
    },
    update(product) {
        return apiClient.put('/products/' + product.id, product)
    },
    delete(id) {
        return apiClient.delete('/products/' + id)
    },
    isUniqueProductName(name) {
        return apiClient.get('/products?name=' + name).then(result => {
            return result.data.length === 0
        })
    }
}

export const AuthService = {
    currentUser: undefined,
    currentToken: undefined,
    isLoggedIn() {
        return !!this.currentToken
    },
    login(email, password) {
        return apiClient
            .post('/auth/login', { email, password })
            .then(response => {
                this.currentToken = response.data.access_token
                localStorage.setItem('token', this.currentToken)
                this.user()
                return response
            })
    },
    logout() {
        this.currentToken = null
        this.currentUser = null
        localStorage.removeItem('token')
    },
    token() {
        if (!this.currentToken) {
            this.currentToken = localStorage.getItem('token')
            if (this.currentToken) {
                this.user()
            }
        }
        return this.currentToken
    },
    user() {
        return apiClient.get('/user').then(response => {
            this.currentUser = response.data
        })
    }
}