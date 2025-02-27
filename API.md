# Jarvis API Documentation

## Endpoints

### 1. Get Supported Tasks 
```
GET /tasks
```

**Response**
```json
{
  "status": "ok",
  "data": [
    {
      "id": 1,
      "name": "生成会议纪要",
      "description": "请将以下会议录音整理成结构清晰的会议纪要..."
    }
    // ... other tasks
  ]
}
```

### 2. Process Text Task
```
POST /process-task
```

**Request Body**
```json
{
  "task": "生成会议纪要",
  "text": "会议内容文本..."
}
```

**Success Response**
```json
{
  "status": "ok",
  "data": "生成的会议纪要文本..."
}
```

**Error Responses**
```json
{
  "error": "无效的任务类型"
}
```

## Error Codes
- 400: Invalid request parameters
- 401: Authorization error
- 500: Internal server error

## Rate Limits
Currently no rate limits, but recommend:
- 10 requests/minute for normal usage 