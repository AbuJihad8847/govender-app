import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Dashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "admin123") { // Simple hardcoded password for now
            setIsAuthenticated(true);
        } else {
            alert("Invalid password");
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchData = async () => {
            try {
                // Fetch Submissions
                const qSub = query(collection(db, "submissions"), orderBy("submittedAt", "desc"));
                const subSnapshot = await getDocs(qSub);
                const subData = subSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSubmissions(subData);

                // Fetch Messages
                const qMsg = query(collection(db, "messages"), orderBy("submittedAt", "desc"));
                const msgSnapshot = await getDocs(qMsg);
                const msgData = msgSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(msgData);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl mb-4 font-bold text-center">Admin Login</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="Enter Password"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button onClick={() => window.location.reload()} className="text-blue-600 hover:underline">Log Out</button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="space-y-12">
                        {/* Submissions Section */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registration Submissions</h2>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner Name</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Business</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submissions.length === 0 ? (
                                                <tr><td colSpan="6" className="p-4 text-center text-gray-500">No submissions yet.</td></tr>
                                            ) : (
                                                submissions.map((sub) => (
                                                    <tr key={sub.id}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            {sub.submittedAt?.seconds ? new Date(sub.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{sub.ownerName}</td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{sub.businessName}</td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{sub.phoneNumber}</td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{sub.email}</td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            {sub.registerSpecificEntity === 'yes' ? sub.specificEntity : 'General'}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Messages Section */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Messages</h2>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {messages.length === 0 ? (
                                                <tr><td colSpan="4" className="p-4 text-center text-gray-500">No messages yet.</td></tr>
                                            ) : (
                                                messages.map((msg) => (
                                                    <tr key={msg.id}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            {msg.submittedAt?.seconds ? new Date(msg.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{msg.name}</td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{msg.phone}</td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{msg.email || 'N/A'}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}
