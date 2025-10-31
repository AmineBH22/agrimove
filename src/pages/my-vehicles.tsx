import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const vehicles = [
  {
    name: 'Volvo FH16 Truck',
    image: 'https://th.bing.com/th/id/R.07990c33c5bc47e1d17ed56f7e6accde?rik=vW6D2f9xZaWOfQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-8g3nqioATKw%2fUilaQ0ebm2I%2fAAAAAAAA6Us%2feutfwZ45HwE%2fs00%2fVolvo-FH16-700-XXL-Truck-2560x1600.jpg&ehk=o67qmmpDXZVxirPbd2ffSOaX%2bneq5IAV5d%2fBJvDjfQg%3d&risl=&pid=ImgRaw&r=0',
    type: 'Truck',
  },
  {
    name: 'Mercedes Actros',
    image: 'https://th.bing.com/th/id/OIP.JvZCVqM2ESlE25aPGiWGNwHaE1?r=0&rs=1&pid=ImgDetMain',
    type: 'Truck',
  },
  {
    name: 'Scania R-Series',
    image: 'https://th.bing.com/th/id/OIP.G6DiUL_ybdNcYixscqatbQHaE8?r=0&rs=1&pid=ImgDetMain',
    type: 'Truck',
  },
  {
    name: 'DAF XF',
    image: 'https://th.bing.com/th/id/OIP.AJdViSlNaQ1deK1BS9W1WAHaFY?r=0&rs=1&pid=ImgDetMain',
    type: 'Truck',
  },
  {
    name: 'MAN TGX',
    image: 'https://th.bing.com/th/id/OIP.ob83m7Z1DGvplx55-R24PwHaE8?r=0&rs=1&pid=ImgDetMain',
    type: 'Truck',
  },
  {
    name: 'Iveco Stralis',
    image: 'https://comatrasa.es/wp-content/uploads/2023/03/iveco-stralis-440-1.jpg',
    type: 'Truck',
  },
  {
    name: 'Renault T',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80',
    type: 'Truck',
  },
  {
    name: 'Ford F-150',
    image: 'https://images.unsplash.com/photo-1511391403515-5c8e1f1b8c84?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Toyota Hilux',
    image: 'https://images.unsplash.com/photo-1519585309867-1c1c7b3c8a43?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Chevrolet Silverado',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Nissan Navara',
    image: 'https://images.unsplash.com/photo-1503736316-1a8b7c7c7c7c?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Isuzu D-Max',
    image: 'https://images.unsplash.com/photo-1503736316-1a8b7c7c7c7c?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Mitsubishi L200',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Volkswagen Amarok',
    image: 'https://images.unsplash.com/photo-1503736316-1a8b7c7c7c7c?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Fiat Ducato',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=300&q=80',
    type: 'Truck',
  },
  {
    name: 'Peugeot Boxer',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80',
    type: 'Truck',
  },
  {
    name: 'Citroën Jumper',
    image: 'https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=300&q=80',
    type: 'Truck',
  },
  {
    name: 'Hyundai H-100',
    image: 'https://images.unsplash.com/photo-1519585309867-1c1c7b3c8a43?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Kia K2700',
    image: 'https://images.unsplash.com/photo-1519585309867-1c1c7b3c8a43?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
  {
    name: 'Mazda BT-50',
    image: 'https://images.unsplash.com/photo-1519585309867-1c1c7b3c8a43?auto=format&fit=crop&w=300&q=80',
    type: 'Car',
  },
];

const VEHICLES_PER_PAGE = 6;

const MyVehicles: React.FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(vehicles.length / VEHICLES_PER_PAGE);

  const paginatedVehicles = vehicles.slice(
    (page - 1) * VEHICLES_PER_PAGE,
    page * VEHICLES_PER_PAGE
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-2">
        <h1 className="text-3xl font-bold mb-8 text-primary-700 text-center">My Vehicles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {paginatedVehicles.map((vehicle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col items-center"
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
              <div className="p-4 w-full text-center">
                <h2 className="font-semibold text-lg">{vehicle.name}</h2>
                <p className="text-neutral-500">{vehicle.type}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <button
            className="px-3 py-1 rounded bg-primary-600 text-white font-semibold disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-primary-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-primary-600 text-white font-semibold disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyVehicles;