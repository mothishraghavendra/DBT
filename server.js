const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from current directory

// Data file path
const DATA_FILE = path.join(__dirname, 'responses.json');

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    // If file doesn't exist, create it with empty responses array
    await fs.writeFile(DATA_FILE, JSON.stringify({ responses: [] }, null, 2));
    console.log('📄 Created responses.json file');
  }
}

// In-memory storage for serverless environment
let inMemoryResponses = [];

// Check if we're in Vercel environment
const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';

// Read responses from JSON file or memory
async function readResponses() {
  try {
    if (isVercel) {
      // In Vercel, use in-memory storage
      console.log(`📖 Reading ${inMemoryResponses.length} responses from memory`);
      return inMemoryResponses;
    } else {
      // Local development - use file system
      await ensureDataFile();
      const data = await fs.readFile(DATA_FILE, 'utf8');
      const parsed = JSON.parse(data);
      // Handle both array format and object format
      return Array.isArray(parsed) ? parsed : (parsed.responses || []);
    }
  } catch (error) {
    console.error('Error reading responses:', error);
    // If file doesn't exist or is corrupted, return empty array
    return [];
  }
}

// Read responses from JSON file


// Write responses to JSON file or memory
async function writeResponses(responses) {
  try {
    if (isVercel) {
      // In Vercel, store in memory (note: this will reset on each function call)
      inMemoryResponses = [...responses];
      console.log(`💾 Stored ${responses.length} responses in memory (Vercel)`);
      return true;
    } else {
      // Local development - use file system
      await ensureDataFile();
      // Store as object with responses array for better structure
      const data = {
        responses: responses,
        lastUpdated: new Date().toISOString(),
        count: responses.length
      };
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      console.log(`💾 Saved ${responses.length} responses to ${DATA_FILE}`);
      return true;
    }
  } catch (error) {
    console.error('❌ Error writing responses:', error);
    return false;
  }
}

// Routes

// Serve the main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// API Routes

// GET all responses
app.get('/api/responses', async (req, res) => {
  try {
    const responses = await readResponses();
    res.json({
      success: true,
      data: responses,
      count: responses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading responses',
      error: error.message
    });
  }
});

// POST new response
app.post('/api/responses', async (req, res) => {
  try {
    const {
      name,
      email,
      dbt_status,
      dbt_enable_method,
      helpful,
      invite_friends,
      useful_features,
      suggestions
    } = req.body;

    // Validation
    if (!name || !email || !dbt_status || !helpful || !invite_friends) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create new response object
    const newResponse = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      dbt_status,
      dbt_enable_method: dbt_enable_method || 'N/A',
      helpful,
      invite_friends,
      useful_features: useful_features || '',
      suggestions: suggestions || ''
    };

    // Read existing responses
    const responses = await readResponses();
    
    // Add new response
    responses.push(newResponse);
    
    // Write back to file
    const writeSuccess = await writeResponses(responses);
    
    if (writeSuccess) {
      res.status(201).json({
        success: true,
        message: 'Response submitted successfully',
        data: newResponse
      });
    } else {
      throw new Error('Failed to save response');
    }

  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving response',
      error: error.message
    });
  }
});

// POST new response (alternative endpoint for form submission)
app.post('/api/submit-form', async (req, res) => {
  try {
    console.log('📝 Received form submission:', req.body);
    
    const {
      name,
      email,
      dbt_status,
      dbt_enable_method,
      helpful,
      invite_friends,
      useful_features,
      suggestions
    } = req.body;

    // Validation
    if (!name || !email || !dbt_status || !helpful || !invite_friends) {
      console.error('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, dbt_status, helpful, invite_friends are required'
      });
    }

    // Create new response object
    const newResponse = {
      id: req.body.id || Date.now().toString(),
      timestamp: req.body.timestamp || new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      dbt_status,
      dbt_enable_method: dbt_enable_method || 'N/A',
      helpful,
      invite_friends,
      useful_features: useful_features || '',
      suggestions: suggestions || ''
    };

    console.log('💾 Saving response:', newResponse);

    // Read existing responses
    const responses = await readResponses();
    
    // Add new response
    responses.push(newResponse);
    
    // Write back to file
    const writeSuccess = await writeResponses(responses);
    
    if (writeSuccess) {
      console.log('✅ Response saved successfully');
      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully',
        data: newResponse,
        total_responses: responses.length
      });
    } else {
      throw new Error('Failed to save response');
    }

  } catch (error) {
    console.error('❌ Error saving response:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving response',
      error: error.message
    });
  }
});

// GET single response by ID
app.get('/api/responses/:id', async (req, res) => {
  try {
    const responses = await readResponses();
    const response = responses.find(r => r.id === req.params.id);
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Response not found'
      });
    }
    
    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading response',
      error: error.message
    });
  }
});

// DELETE response by ID
app.delete('/api/responses/:id', async (req, res) => {
  try {
    const responses = await readResponses();
    const initialLength = responses.length;
    const filteredResponses = responses.filter(r => r.id !== req.params.id);
    
    if (filteredResponses.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Response not found'
      });
    }
    
    const writeSuccess = await writeResponses(filteredResponses);
    
    if (writeSuccess) {
      res.json({
        success: true,
        message: 'Response deleted successfully'
      });
    } else {
      throw new Error('Failed to delete response');
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting response',
      error: error.message
    });
  }
});

// DELETE all responses
app.delete('/api/responses', async (req, res) => {
  try {
    const writeSuccess = await writeResponses([]);
    
    if (writeSuccess) {
      res.json({
        success: true,
        message: 'All responses deleted successfully'
      });
    } else {
      throw new Error('Failed to clear responses');
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing responses',
      error: error.message
    });
  }
});

// GET statistics
app.get('/api/stats', async (req, res) => {
  try {
    const responses = await readResponses();
    
    const stats = {
      total: responses.length,
      dbtEnabled: responses.filter(r => r.dbt_status === 'Yes').length,
      veryHelpful: responses.filter(r => r.helpful === 'Very Helpful').length,
      wouldRecommend: responses.filter(r => r.invite_friends.includes('Yes')).length,
      responsesByDay: {},
      helpfulnessBreakdown: {
        'Very Helpful': 0,
        'Helpful': 0,
        'Neutral': 0,
        'Not Helpful': 0
      },
      dbtStatusBreakdown: {
        'Yes': 0,
        'No': 0,
        'Not Sure': 0
      }
    };
    
    // Calculate breakdowns
    responses.forEach(response => {
      // Helpfulness breakdown
      if (stats.helpfulnessBreakdown.hasOwnProperty(response.helpful)) {
        stats.helpfulnessBreakdown[response.helpful]++;
      }
      
      // DBT status breakdown
      if (stats.dbtStatusBreakdown.hasOwnProperty(response.dbt_status)) {
        stats.dbtStatusBreakdown[response.dbt_status]++;
      }
      
      // Responses by day
      const date = new Date(response.timestamp).toDateString();
      stats.responsesByDay[date] = (stats.responsesByDay[date] || 0) + 1;
    });
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating statistics',
      error: error.message
    });
  }
});

// Export responses as JSON
app.get('/api/export', async (req, res) => {
  try {
    const responses = await readResponses();
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=dbt_feedback_responses_${new Date().toISOString().split('T')[0]}.json`);
    
    res.json({
      exportDate: new Date().toISOString(),
      totalResponses: responses.length,
      responses: responses
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error exporting responses',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DBT Feedback Server is running',
    timestamp: new Date().toISOString(),
    dataFile: DATA_FILE
  });
});

// DELETE all responses
app.delete('/api/clear-responses', async (req, res) => {
  try {
    // Clear the responses file by writing an empty array
    await fs.writeFile(DATA_FILE, JSON.stringify({ responses: [] }, null, 2));
    
    console.log('🗑️  All responses cleared');
    
    res.json({
      success: true,
      message: 'All responses have been cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error clearing responses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear responses',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DBT Feedback Server is running on http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`📝 Feedback Form: http://localhost:${PORT}/form`);
  console.log(`🏠 Main Dashboard: http://localhost:${PORT}/`);
  console.log(`💾 Data will be stored in: ${DATA_FILE}`);
});

module.exports = app;