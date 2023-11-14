import requests
base_url = 'http://localhost:5001/api'

def create_course(course_data):
    endpoint = '/courses'
    url = f'{base_url}{endpoint}'
    headers = {'Accept': 'application/json'}

    response = requests.post(url, json=course_data, headers=headers)

    if response.status_code == 200:
        print('Course created successfully!')
        print(response.json())
    else:
        print('Error creating course:')
        print(response.text)

def update_course(course_id, updated_data):
    endpoint = f'/courses/{course_id}'
    url = f'{base_url}{endpoint}'
    headers = {'Accept': 'application/json'}

    response = requests.put(url, json=updated_data, headers=headers)

    if response.status_code == 200:
        print(f'Course {course_id} updated successfully!')
        print(response.json())
    else:
        print(f'Error updating course {course_id}:')
        print(response.text)

course_data = {
    'name': 'Introduction to Programming',
    'description': 'A beginner-friendly course on programming.'
}

# Call the create_course function with the provided course data
create_course(course_data)

