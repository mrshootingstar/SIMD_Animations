import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            SIMD Operations Visualizer
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore and understand Single Instruction Multiple Data (SIMD) operations through interactive visualizations. Perfect for learning parallel computing concepts.
          </p>

          <div className="space-y-4">
            <Link 
              href="/visualization" 
              className="inline-block px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Launch Visualizer
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Basic Operations</h3>
              <p className="text-gray-400">
                Explore fundamental SIMD operations including addition, multiplication, minimum, and maximum.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Bitwise Operations</h3>
              <p className="text-gray-400">
                Visualize how AND, OR, and XOR operations work on multiple data elements simultaneously.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Advanced Operations</h3>
              <p className="text-gray-400">
                Master complex operations like shuffle, blend, and vector permutations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}