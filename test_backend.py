#!/usr/bin/env python3
"""
Simple test script to verify the backend API is working correctly
"""

import requests
import json

def test_backend():
    base_url = "http://localhost:8000"
    
    print("Testing LinkedIn Content Formatter Backend API...")
    print("=" * 50)
    
    # Test 1: Health check
    print("1. Testing health check...")
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return
    
    # Test 2: Format content
    print("\n2. Testing content formatting...")
    test_content = "**Hello World!** This is *italic text* and #hashtag"
    
    try:
        response = requests.post(f"{base_url}/api/format", json={
            "content": test_content,
            "preserve_formatting": True
        })
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Content formatting passed")
            print(f"   Original: {test_content}")
            print(f"   Formatted: {data['formatted_content']}")
            print(f"   Character count: {data['character_count']}")
            if data['warnings']:
                print(f"   Warnings: {data['warnings']}")
        else:
            print(f"❌ Content formatting failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Content formatting failed: {e}")
    
    # Test 3: Validate content
    print("\n3. Testing content validation...")
    try:
        response = requests.post(f"{base_url}/api/validate", json={
            "content": "This is a test post with #hashtag"
        })
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Content validation passed")
            print(f"   Is valid: {data['is_valid']}")
            if data['warnings']:
                print(f"   Warnings: {data['warnings']}")
            if data['suggestions']:
                print(f"   Suggestions: {data['suggestions']}")
        else:
            print(f"❌ Content validation failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Content validation failed: {e}")
    
    # Test 4: Get templates
    print("\n4. Testing template retrieval...")
    try:
        response = requests.get(f"{base_url}/api/templates")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Template retrieval passed - Found {len(data)} templates")
            for template in data[:2]:  # Show first 2 templates
                print(f"   - {template['name']} ({template['category']})")
        else:
            print(f"❌ Template retrieval failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Template retrieval failed: {e}")
    
    print("\n" + "=" * 50)
    print("Backend API test completed!")

if __name__ == "__main__":
    test_backend()
