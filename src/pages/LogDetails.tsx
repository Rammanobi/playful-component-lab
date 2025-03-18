
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Trash2, CalendarDays } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLogDetails } from '@/hooks/useLogDetails';

const LogDetails = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const {
    sleepData,
    mealData,
    stressLogs,
    skincareRoutines,
    dayDescriptions,
    deleteItem,
    activeTab,
    setActiveTab,
    today
  } = useLogDetails(type);

  // Format the date for display
  const formattedDate = new Date(today).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="app-container page-transition">
      <Header title="Today's Logs" showBackButton />
      
      <div className="px-5 space-y-6">
        <Button variant="outline" onClick={() => navigate('/storage')} className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Storage
        </Button>
        
        <div className="flex items-center justify-center mb-4 text-lg font-medium">
          <CalendarDays className="h-5 w-5 mr-2" />
          {formattedDate}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="meal">Meals</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
            <TabsTrigger value="skincare">Skincare</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sleep">
            <Card>
              <CardHeader>
                <CardTitle>Today's Sleep Record</CardTitle>
              </CardHeader>
              <CardContent>
                {sleepData.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Quality</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sleepData.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.timestamp || "Not recorded"}</TableCell>
                          <TableCell>{entry.hoursSlept}</TableCell>
                          <TableCell>{entry.quality}</TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteItem('sleep', entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">No sleep records for today.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meal">
            <Card>
              <CardHeader>
                <CardTitle>Today's Meals</CardTitle>
              </CardHeader>
              <CardContent>
                {mealData.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mealData.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.title}</TableCell>
                          <TableCell>{entry.time}</TableCell>
                          <TableCell className="max-w-48 truncate">{entry.description || "N/A"}</TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteItem('meal', entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">No meal records for today.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stress">
            <Card>
              <CardHeader>
                <CardTitle>Today's Stress Logs</CardTitle>
              </CardHeader>
              <CardContent>
                {stressLogs.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stressLogs.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.timestamp || "Not recorded"}</TableCell>
                          <TableCell>{entry.rating}/5</TableCell>
                          <TableCell className="max-w-48 truncate">{entry.notes || "N/A"}</TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteItem('stress', entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">No stress logs for today.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skincare">
            <Card>
              <CardHeader>
                <CardTitle>Today's Skincare Routine</CardTitle>
              </CardHeader>
              <CardContent>
                {skincareRoutines.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reminder Time</TableHead>
                        <TableHead>Products Used</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {skincareRoutines.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.reminderTime}</TableCell>
                          <TableCell>
                            {[
                              entry.serum1 && 'Serum 1',
                              entry.serum2 && 'Serum 2',
                              entry.sunscreen && 'Sunscreen',
                              entry.moisturizer && 'Moisturizer'
                            ].filter(Boolean).join(', ')}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteItem('skincare', entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">No skincare routines for today.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="day">
            <Card>
              <CardHeader>
                <CardTitle>Today's Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                {dayDescriptions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dayDescriptions.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.timestamp || "Not recorded"}</TableCell>
                          <TableCell className="max-w-48 truncate">{entry.description}</TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteItem('day', entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">No day descriptions for today.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LogDetails;
