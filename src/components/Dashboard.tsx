import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Shipment, UserProfile } from '../types';
import { Package, Search, User, Mail, Calendar, Shield, Hash, Plus, CheckCircle2, AlertCircle, MapPin, Activity } from 'lucide-react';
import { format } from 'date-fns';

interface DashboardProps {
  profile: UserProfile | null;
}

export default function Dashboard({ profile }: DashboardProps) {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [claimTracking, setClaimTracking] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  useEffect(() => {
    if (!profile) return;

    const fetchData = async () => {
      try {
        const [sData, fData] = await Promise.all([
          api.shipments.list(),
          api.flights.list()
        ]);
        
        // Filter shipments where user is sender OR receiver
        const filteredShipments = sData.filter(s => 
          s.senderId === profile.uid || 
          s.senderEmail === profile.email || 
          s.receiverEmail === profile.email
        );
        
        // Filter flights where user is in userIds
        const filteredFlights = fData.filter(f => f.userIds && f.userIds.includes(profile.uid));
        
        setShipments(filteredShipments);
        setFlights(filteredFlights);
        setLastRefreshed(new Date());
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Poll for updates every 15 seconds
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [profile]);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !claimTracking) return;
    
    setClaiming(true);
    setClaimStatus(null);
    
    try {
      // First try to claim as shipment
      try {
        const shipmentData = await api.shipments.list();
        const searchVal = claimTracking.trim().toUpperCase();
        const shipment = shipmentData.find(s => 
          (s.trackingNumber && s.trackingNumber.toUpperCase() === searchVal) || 
          (s.id && s.id.toUpperCase() === searchVal)
        );
        
        if (shipment) {
          await api.shipments.claim(shipment.id);
          setClaimStatus({ type: 'success', message: 'Shipment successfully claimed!' });
        } else {
          // If not found as shipment, try as flight
          const flightData = await api.flights.list();
          const flight = flightData.find(f => 
            (f.flightNumber && f.flightNumber.toUpperCase() === searchVal) || 
            (f.id && f.id.toUpperCase() === searchVal)
          );
          
          if (flight) {
            await api.flights.claim(flight.id);
            setClaimStatus({ type: 'success', message: 'Flight successfully claimed!' });
          } else {
            setClaimStatus({ type: 'error', message: 'Tracking or Flight number not found.' });
            setClaiming(false);
            return;
          }
        }
      } catch (err: any) {
        // If shipment claim failed, maybe it exists but auth failed or something. 
        // But let's try flight anyway if it was a "not found" style error.
        setClaimStatus({ type: 'error', message: err.message || 'Claim failed.' });
        setClaiming(false);
        return;
      }
      
      setClaimTracking('');
      
      // Refresh data
      const [sData, fData] = await Promise.all([
        api.shipments.list(),
        api.flights.list()
      ]);
      const filteredShipments = sData.filter(s => 
        s.senderId === profile.uid || 
        s.senderEmail === profile.email || 
        s.receiverEmail === profile.email
      );
      const filteredFlights = fData.filter(f => f.userIds && f.userIds.includes(profile.uid));
      setShipments(filteredShipments);
      setFlights(filteredFlights);
    } catch (error: any) {
      setClaimStatus({ type: 'error', message: error.message || 'An error occurred while claiming.' });
    } finally {
      setClaiming(false);
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending': return 10;
      case 'warehouse': return 25;
      case 'carrier-1': return 40;
      case 'carrier-2': return 55;
      case 'carrier-3': return 70;
      case 'customs': return 85;
      case 'shipped': return 95;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  const filteredShipments = shipments.filter(s => 
    s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.receiverName && s.receiverName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8 sm:gap-12 animate-fade-in py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-text">Dashboard</h2>
          <p className="text-xs sm:text-sm font-medium text-muted">Your account overview and shipment details</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none">Last_Sync</span>
            <span className="text-xs font-mono font-bold text-primary">{format(lastRefreshed, 'HH:mm:ss')}</span>
          </div>
          <button 
            onClick={() => {
              setLoading(true);
              const fetchDataInternal = async () => {
                try {
                  const [sData, fData] = await Promise.all([
                    api.shipments.list(),
                    api.flights.list()
                  ]);
                  const filteredShipments = sData.filter(s => 
                    s.senderId === profile?.uid || 
                    s.senderEmail === profile?.email || 
                    s.receiverEmail === profile?.email
                  );
                  const filteredFlights = fData.filter(f => f.userIds && f.userIds.includes(profile?.uid));
                  setShipments(filteredShipments);
                  setFlights(filteredFlights);
                  setLastRefreshed(new Date());
                } catch (error) {
                  console.error('Error fetching dashboard data:', error);
                } finally {
                  setLoading(false);
                }
              };
              fetchDataInternal();
            }}
            className="btn-secondary !py-2 !px-4 !text-[10px] flex items-center gap-2"
          >
            <Activity className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            SYNC_DATA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Registration Details & Claim Shipment */}
        <div className="lg:col-span-1 flex flex-col gap-6 sm:gap-8">
          <div className="card-modern p-5 sm:p-8 bg-white border-primary/10">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Registration Details
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Customer ID</span>
                <div className="flex items-center gap-2 text-text font-bold">
                  <Hash className="w-4 h-4 text-primary" />
                  {profile?.customerID || 'N/A'}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Full Name</span>
                <span className="text-lg font-bold text-text">{profile?.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Email Address</span>
                <div className="flex items-center gap-2 text-text font-medium">
                  <Mail className="w-4 h-4 text-muted" />
                  {profile?.email}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Account Type</span>
                <div className="flex items-center gap-2 text-text font-medium">
                  <Shield className="w-4 h-4 text-muted" />
                  <span className="capitalize">{profile?.role}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Joined Date</span>
                <div className="flex items-center gap-2 text-text font-medium">
                  <Calendar className="w-4 h-4 text-muted" />
                  {profile?.createdAt ? format(new Date(profile.createdAt), 'MMMM dd, yyyy') : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Claim Shipment/Flight */}
          <div className="card-modern p-5 sm:p-8 bg-white border-primary/10">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Claim Shipment/Flight
            </h3>
            <form onSubmit={handleClaim} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Tracking / Flight Number</span>
                <input 
                  type="text" 
                  value={claimTracking}
                  onChange={(e) => setClaimTracking(e.target.value)}
                  placeholder="Enter number..."
                  className="input-modern py-2 text-sm"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={claiming}
                className="btn-primary py-2.5 text-xs w-full"
              >
                {claiming ? 'Claiming...' : 'Claim Item'}
              </button>
              {claimStatus && (
                <div className={`p-3 rounded-lg flex items-center gap-2 text-xs font-bold ${
                  claimStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {claimStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {claimStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
          <div className="card-modern p-5 sm:p-8 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Shipment Details
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input 
                  type="text" 
                  placeholder="Search tracking..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-muted font-medium">Loading shipments...</div>
            ) : filteredShipments.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-border rounded-2xl flex flex-col items-center gap-4">
                <Package className="w-10 h-10 text-muted/20" />
                <p className="text-sm font-bold text-muted uppercase tracking-widest">No shipments found</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredShipments.map((shipment) => (
                  <div key={shipment.id} className="p-4 border border-border rounded-xl hover:border-primary/30 transition-all bg-bg/30">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Tracking Number</span>
                        <span className="font-mono font-bold text-primary">{shipment.trackingNumber}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Status</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full w-fit ${
                          shipment.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 
                          shipment.status === 'cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {shipment.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-widest">
                        <span>Progress</span>
                        <span>{getStatusProgress(shipment.status)}%</span>
                      </div>
                      <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${
                            shipment.status === 'delivered' ? 'bg-emerald-500' : 
                            shipment.status === 'cancelled' ? 'bg-rose-500' : 'bg-primary'
                          }`}
                          style={{ width: `${getStatusProgress(shipment.status)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Receiver</span>
                        <span className="text-sm font-bold">{shipment.receiverName}</span>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Destination</span>
                        <span className="text-sm font-bold text-right">{shipment.destination || shipment.receiverAddress}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={`/tracking?id=${shipment.trackingNumber}`}
                      className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-2 text-[10px] font-black text-primary hover:text-accent transition-colors uppercase tracking-widest"
                    >
                      View Full Details <Activity className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tracked Flights Section */}
          <div className="card-modern p-5 sm:p-8 bg-white border-primary/10">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Tracked Flights
            </h3>
            {flights.length === 0 ? (
              <div className="py-8 text-center border-2 border-dashed border-border rounded-2xl flex flex-col items-center gap-3">
                <Shield className="w-8 h-8 text-muted/20" />
                <p className="text-xs font-bold text-muted uppercase tracking-widest">No flights tracked</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="p-4 border border-border rounded-xl bg-primary/5 hover:border-primary/30 transition-all flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black font-mono text-primary">{flight.flightNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        flight.status === 'arrived' ? 'bg-emerald-100 text-emerald-700' : 
                        flight.status === 'delayed' ? 'bg-amber-100 text-amber-700' : 'bg-primary/10 text-primary'
                      }`}>
                        {flight.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Origin</span>
                        <span className="text-sm font-bold">{flight.origin}</span>
                      </div>
                      <div className="h-px flex-1 bg-border/50 mx-2 mb-2"></div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Dest</span>
                        <span className="text-sm font-bold">{flight.destination}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={`/tracking?id=${flight.flightNumber}&type=flight`}
                      className="mt-2 pt-4 border-t border-border/50 flex items-center justify-center gap-2 text-[10px] font-black text-primary hover:text-accent transition-colors uppercase tracking-widest"
                    >
                      Track Live <Plus className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
