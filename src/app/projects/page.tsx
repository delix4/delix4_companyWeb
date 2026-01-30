import Image from 'next/image';

const projects = [
    {
        title: 'E-Commerce Platform',
        category: 'Web Development',
        description: 'A full-featured e-commerce solution with payment integration and inventory management.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Finance Dashboard',
        category: 'Data Visualization',
        description: 'Real-time financial data visualization dashboard for investment firms.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Health & Fitness App',
        category: 'Mobile App',
        description: 'Cross-platform mobile application for tracking workouts and nutrition.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Corporate Portfolio',
        category: 'Branding',
        description: 'Modern corporate website with CMS integration for a leading architecture firm.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
];

export default function Projects() {
    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Portfolio</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Our Recent Work
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Check out some of the projects we&apos;ve delivered for our happy clients.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {projects.map((project) => (
                        <div key={project.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div className="flex-shrink-0 relative h-48 w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-600">
                                        {project.category}
                                    </p>
                                    <a href="#" className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900">{project.title}</p>
                                        <p className="mt-3 text-base text-gray-500">{project.description}</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
