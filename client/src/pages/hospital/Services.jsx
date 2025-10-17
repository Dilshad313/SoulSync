import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import Input, { TextArea } from '../../components/UI/Input';

const Services = () => {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // API call would go here
      setServices([
        {
          id: 1,
          name: 'Individual Therapy Session',
          description: 'One-on-one therapy session with a licensed therapist',
          price: 150,
          duration: '50 minutes',
          category: 'Therapy',
          status: 'active'
        },
        {
          id: 2,
          name: 'Family Counseling',
          description: 'Family therapy session to improve communication and relationships',
          price: 200,
          duration: '90 minutes',
          category: 'Therapy',
          status: 'active'
        },
        {
          id: 3,
          name: 'Group Therapy',
          description: 'Supportive group therapy sessions for various mental health concerns',
          price: 75,
          duration: '60 minutes',
          category: 'Therapy',
          status: 'active'
        },
        {
          id: 4,
          name: 'Psychiatric Evaluation',
          description: 'Comprehensive psychiatric assessment and diagnosis',
          price: 300,
          duration: '90 minutes',
          category: 'Assessment',
          status: 'active'
        },
        {
          id: 5,
          name: 'Mindfulness Workshop',
          description: 'Learn mindfulness and meditation techniques',
          price: 50,
          duration: '2 hours',
          category: 'Workshop',
          status: 'active'
        }
      ]);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddService = async () => {
    setLoading(true);
    try {
      await fetch('/api/hospital/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newService)
      });

      alert('Service added successfully!');
      setIsAddModalOpen(false);
      setNewService({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: ''
      });
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service');
    }
    setLoading(false);
  };

  const handleEditService = async () => {
    setLoading(true);
    try {
      await fetch(`/api/hospital/services/${selectedService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(selectedService)
      });

      alert('Service updated successfully!');
      setIsEditModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service');
    }
    setLoading(false);
  };

  const handleDeleteService = async (serviceId) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await fetch(`/api/hospital/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setServices(services.filter(s => s.id !== serviceId));
      alert('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'therapy': return 'primary';
      case 'assessment': return 'info';
      case 'workshop': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Services & Packages
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your facility's services and wellness packages
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={(props) => (
              <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          >
            Add Service
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Services</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{services.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Therapy Services</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {services.filter(s => s.category === 'Therapy').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Avg. Price</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Active Services</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {services.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} hover>
              <CardContent>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={getCategoryColor(service.category)} size="sm">
                    {service.category}
                  </Badge>
                  <Badge variant="success" size="sm">
                    {service.status}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Duration</p>
                    <p className="font-medium text-slate-900 dark:text-white">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 dark:text-slate-400">Price</p>
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      ${service.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setSelectedService(service);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    fullWidth
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Service Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Service"
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Service Name"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              required
            />
            <TextArea
              label="Description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              rows={3}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price ($)"
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                required
              />
              <Input
                label="Duration"
                placeholder="e.g., 50 minutes"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                required
              />
            </div>
            <Input
              label="Category"
              placeholder="e.g., Therapy, Assessment, Workshop"
              value={newService.category}
              onChange={(e) => setNewService({ ...newService, category: e.target.value })}
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddService} loading={loading}>
                Add Service
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Service Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Service"
          size="md"
        >
          {selectedService && (
            <div className="space-y-4">
              <Input
                label="Service Name"
                value={selectedService.name}
                onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                required
              />
              <TextArea
                label="Description"
                value={selectedService.description}
                onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                rows={3}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price ($)"
                  type="number"
                  value={selectedService.price}
                  onChange={(e) => setSelectedService({ ...selectedService, price: e.target.value })}
                  required
                />
                <Input
                  label="Duration"
                  value={selectedService.duration}
                  onChange={(e) => setSelectedService({ ...selectedService, duration: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Category"
                value={selectedService.category}
                onChange={(e) => setSelectedService({ ...selectedService, category: e.target.value })}
                required
              />

              <div className="flex gap-3 justify-end pt-4">
                <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleEditService} loading={loading}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Services;
