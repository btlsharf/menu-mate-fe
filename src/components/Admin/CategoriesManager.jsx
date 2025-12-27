import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      alert('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setAdding(true);
    setName('');
  };

  const handleEdit = (category) => {
    setEditing(category.id);
    setName(category.name);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      if (adding) {
        const { error } = await supabase.from('categories').insert({ name });
        if (error) throw error;
      } else if (editing) {
        const { error } = await supabase.from('categories').update({ name }).eq('id', editing);
        if (error) throw error;
      }

      setAdding(false);
      setEditing(null);
      setName('');
      loadCategories();
    } catch (error) {
      alert('Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure? This will remove the category from all menu items.')) return;

    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      loadCategories();
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  const handleCancel = () => {
    setAdding(false);
    setEditing(null);
    setName('');
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        {!adding && !editing && (
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {(adding || editing) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {adding ? 'Add New Category' : 'Edit Category'}
          </h3>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Save size={18} />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{category.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(category)}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
