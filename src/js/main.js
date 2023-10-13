const body = document.querySelector('body')
const burgerBtn = document.querySelector('.burgerBtn')
const nav = document.querySelector('nav')
const sections = document.querySelectorAll('section')
// const desktopNavs = document.querySelectorAll('.desktopNavs>a')
const mobileNavs = document.querySelectorAll('.mobileNav>a')
const buttons = document.querySelectorAll('button')

const navBar = () => {
	body.classList.toggle('hidden')
	if (body.classList.contains('hidden')) {
		burgerBtn.innerHTML = `<i class="fas fa-times"></i>`
	} else if (!body.classList.contains('hidden')) {
		burgerBtn.innerHTML = `<i class="fas fa-bars"></i>`
	}
}

const controleHeight = () => {
	if (/iPhone|Android/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0) {
		const heightElements = document.querySelectorAll('[heightElement]')
		heightElements.forEach(heightElement => {
			heightElement.style.height = `${window.innerHeight - nav.clientHeight}px`
		})
	}
}
const controleWidth = () => {
	if (/iPhone|Android/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0) {
		const sliderImgs = [...document.querySelectorAll('.slider__img')]
		const wrapper = document.querySelector('.products')
		sliderImgs.forEach(sliderImg => {
			sliderImg.style.width = `${
				window.innerWidth - 2 * parseInt(window.getComputedStyle(wrapper).getPropertyValue('padding'))
			}px`
		})
	}
}
const resize = () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

burgerBtn.addEventListener('touchstart', navBar)
mobileNavs.forEach(mobileNav => mobileNav.addEventListener('touchstart', navBar))
buttons.forEach(button =>
	button.addEventListener('touchstart', () => {
		button.classList.toggle('hover')
	})
)
buttons.forEach(button => button.addEventListener('touchend', () => button.classList.remove('hover')))
controleHeight()
controleWidth()
resize()

// const scrollSpy = new IntersectionObserver(
// 	entries =>
// 		entries.forEach(entry => {
// 			desktopNavs.forEach(desktopNav => desktopNav.classList.remove('activeLink'))
// 			const link = document.querySelector(`a[href='#${entry.target.id}']`)
// 			link.classList.toggle('activeLink', entry.isIntersecting)
// 		}),
// 	{
// 		threshold: 0.5,
// 		rootMargin: '-100px',
// 	}
// )

// sections.forEach(section => {
// 	scrollSpy.observe(section)
// })
