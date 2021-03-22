from django.shortcuts import render
from rest_framework.views import APIView
from myCost.models import Cost
from myCost.serializers import CostSerializer
from django.http import Http404
import json
import requests
from datetime import *
from rest_framework.response import Response

# Create your views here.
class Utilities():
    def get_object_with_date(id):
        try:
            today = date.today()
            todaystr = today.strftime("%Y-%m-%d")
            return True, Cost.objects.get(created=todaystr,tigId=id)
        except Cost.DoesNotExist: 
            return False, todaystr

    def get_object(id):
        try:
            return Cost.objects.get(tigId=id)
        except Cost.DoesNotExist: 
            return False

#Met à jour la table des coùts lors d'une incrementations de la quantité d'un produit

class AddCost():
    def add(id,quantity,totalPrice):
        # today = date.today()
        prod = Utilities.get_object_with_date(id)
        # if prod.created.date() == today.strftime("%Y-%m-%d"):
        if prod[0] is True:
            prod = prod[1]
            if quantity >= 0 and totalPrice >= 0:
                prod.quantity = prod.quantity + quantity
                prod.totalPrice = prod.totalPrice + totalPrice
                prod.save()
                response = {}
                response['message'] = 'Cout ajouté'
                response['id'] = id
                return True
            else:
                return False
        elif prod[0] is False:
            if quantity >= 0 and totalPrice > 0:
                serializer = CostSerializer(data={'tigId':str(id),'quantity':quantity,'totalPrice':totalPrice,'created':prod[1]})
                if serializer.is_valid():
                    serializer.save()
                    return True
            else:
                return False

#Obtenir le coùt annuelle pour une année donnée
class TotalCostPerYear(APIView):

    def get(self,request,year):
        prods = Cost.objects.all()
        totalCostPerYear = 0
        if prods:
            for prod in prods:
                if prod.created.today().year == year:
                    totalCostPerYear += prod.totalPrice
                
            response = {}
            response['message']= 'Le coût total est :'
            response['totalCostPerYear']= totalCostPerYear
            return Response(response,status=200)
        else:
            erreur = {}
            erreur['message'] = 'Aucunes données trouvées'
            return Response(erreur,status=404)



                
        


    
    





